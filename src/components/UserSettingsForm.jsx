import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import authService from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import {
    FaUser,
    FaPen,
    FaTimesCircle,
    FaSave,
    FaCheck,
    FaTimes
} from 'react-icons/fa'
import { login } from '../store/authSlice'

function UserSettingsForm() {
    const userData = useSelector(state => state.auth.userData) || [];
    const [activeModal, setActiveModal] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState("")
    const [backendError, setBackendError] = useState("")

    const dispach = useDispatch()

    
    // Forms setup
    const {
        register: registerName,
        handleSubmit: handleSubmitName,
        formState: { errors: nameErrors },
        reset: resetName,
    } = useForm({
        defaultValues: {
            name: userData?.name || "",
        },
    })

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: emailErrors },
        reset: resetEmail,
    } = useForm({
        defaultValues: {
            email: userData?.email || "",
        },
    })


    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        watch: watchPassword,
        formState: { errors: passwordErrors },
        reset: resetPassword,
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })


    const openModal = (modalName) => {
        setActiveModal(modalName)
        setBackendError("")
        
        // Reset the specific form
        if (modalName === 'name') resetName()
        if (modalName === 'email') resetEmail()
        if (modalName === 'phone') resetPhone()
        if (modalName === 'password') resetPassword()
    }

    const closeModal = () => {
        setActiveModal(null)
        setBackendError("")
    }

    const showSuccessMessage = (message) => {
        setUpdateSuccess(message)
        setTimeout(() => {
            setUpdateSuccess("")
        }, 5000)
    }

    // Update functions
    const updateName = async (data) => {
        try {
            setIsLoading(true)
            setBackendError("")
            
            const updatedUser = await authService.updateName(data.name)
            
            if (updatedUser) {
              dispach(login({ userData: updatedUser }))
                closeModal()
                showSuccessMessage("Name updated successfully")
            }
        } catch (error) {
            console.error("Error updating name:", error)
            setBackendError(error.message || "Failed to update name")
        } finally {
            setIsLoading(false)
        }
    }

    const updateEmail = async (data) => {
        try {
            setIsLoading(true)
            setBackendError("")
            
            const updatedUser = await authService.updateEmail(data.email,data.password)
            
            if (updatedUser) {
                console.log("updatedUser ==> ",updatedUser)
                dispach(login({ userData: updatedUser }))
                closeModal()
                showSuccessMessage("Email updated successfully")
            }
        } catch (error) {
            console.error("Error updating email:", error)
            let errorMessage = "Failed to update email"
            
            if (error.message.toLowerCase().includes("email already exists")) {
                errorMessage = "This email is already in use"
            } else if (error.message.toLowerCase().includes("invalid email")) {
                errorMessage = "Please enter a valid email address"
            }
            
            setBackendError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const updatePassword = async (data) => {
        try {
            setIsLoading(true)
            setBackendError("")
            
            const updatedUser = await authService.updatePassword(
                data.newPassword,
                data.currentPassword
            )
            
            if (updatedUser) {
                dispach(login({ userData: updatedUser }))
                closeModal()
                showSuccessMessage("Password updated successfully")
            }
        } catch (error) {
            console.error("Error updating password:", error)
            let errorMessage = "Failed to update password"
            
            if (error.message.toLowerCase().includes("invalid password")) {
                errorMessage = "Current password is incorrect"
            } else if (error.message.toLowerCase().includes("weak password")) {
                errorMessage = "New password is too weak. Use a stronger password"
            }
            
            setBackendError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }
    
    // Modal component
    const Modal = ({ isOpen, title, onClose, children }) => {
        if (!isOpen) return null
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg w-full max-w-md mx-4">
                    <div className="flex justify-between items-center border-b p-4">
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FaTimes size={20} />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden p-8 mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <FaUser className="mr-3 text-blue-500" />
                Account Settings
            </h2>
            
            {/* Success message */}
            {updateSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
                    <FaCheck className="mr-2" />
                    {updateSuccess}
                </div>
            )}
            
            {/* User Info Fields */}
            <div className="space-y-6 mb-8">
                <div className="p-6 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Name Field */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Full Name</p>
                                <p className="text-lg font-medium">{userData?.name || "Not set"}</p>
                            </div>
                            <Button 
                                onClick={() => openModal('name')}
                                className="flex items-center justify-center p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                            >
                                <FaPen />
                            </Button>
                        </div>
                        
                        {/* Email Field */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Email Address</p>
                                <p className="text-lg font-medium">{userData?.email || "Not set"}</p>
                            </div>
                            <Button 
                                onClick={() => openModal('email')}
                                className="flex items-center justify-center p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                            >
                                <FaPen />
                            </Button>
                        </div>
                        
                        {/* Password Field */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Password</p>
                                <p className="text-lg font-medium">••••••••</p>
                            </div>
                            <Button 
                                onClick={() => openModal('password')}
                                className="flex items-center justify-center p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                            >
                                <FaPen />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Name Update Modal */}
            <Modal 
                isOpen={activeModal === 'name'} 
                title="Update Name" 
                onClose={closeModal}
            >
                <form onSubmit={handleSubmitName(updateName)} className="space-y-4">
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            {...registerName("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />
                        {nameErrors.name && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {nameErrors.name.message}
                            </p>
                        )}
                    </div>
                    
                    {backendError && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <FaTimesCircle className="mr-2" />
                            {backendError}
                        </p>
                    )}
                    
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button
                            onClick={closeModal}
                            varient="gray"
                            className="py-2 px-4"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            varient="blue"
                            className="flex items-center justify-center space-x-2 py-2 px-4"
                            isLoading={isLoading}
                        >
                            <FaSave />
                            <span>Update</span>
                        </Button>
                    </div>
                </form>
            </Modal>
            
            {/* Email Update Modal */}
            <Modal 
                isOpen={activeModal === 'email'} 
                title="Update Email" 
                onClose={closeModal}
            >
                <form onSubmit={handleSubmitEmail(updateEmail)} className="space-y-4">
                    <div>
                        <Input
                            label="Email Address"
                            placeholder="Enter your email address"
                            type="email"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            {...registerEmail("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {emailErrors.email && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {emailErrors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Password"
                            placeholder="Enter your password.."
                            type="password"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            {...registerEmail("password", {
                                required: "Password is required",
                            })}
                        />
                        {emailErrors.password && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {emailErrors.password.message}
                            </p>
                        )}
                    </div>
                    
                    {backendError && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <FaTimesCircle className="mr-2" />
                            {backendError}
                        </p>
                    )}
                    
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button
                            onClick={closeModal}
                            varient="gray"
                            className="py-2 px-4"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            varient="blue"
                            className="flex items-center justify-center space-x-2 py-2 px-4"
                            isLoading={isLoading}
                        >
                            <FaSave />
                            <span>Update</span>
                        </Button>
                    </div>
                </form>
            </Modal>
            
            
            {/* Password Update Modal */}
            <Modal 
                isOpen={activeModal === 'password'} 
                title="Change Password" 
                onClose={closeModal}
            >
                <form onSubmit={handleSubmitPassword(updatePassword)} className="space-y-4">
                    <div>
                        <Input
                            label="Current Password"
                            placeholder="Enter your current password"
                            type="password"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            {...registerPassword("currentPassword", {
                                required: "Current password is required"
                            })}
                        />
                        {passwordErrors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {passwordErrors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="New Password"
                            placeholder="Enter your new password"
                            type="password"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            {...registerPassword("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                        {passwordErrors.newPassword && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {passwordErrors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Confirm New Password"
                            placeholder="Confirm your new password"
                            type="password"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            {...registerPassword("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value => 
                                    value === watchPassword("newPassword") || "Passwords do not match"
                            })}
                        />
                        {passwordErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {passwordErrors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    
                    {backendError && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            <FaTimesCircle className="mr-2" />
                            {backendError}
                        </p>
                    )}
                    
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button
                            onClick={closeModal}
                            varient="gray"
                            className="py-2 px-4"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            varient="blue"
                            className="flex items-center justify-center space-x-2 py-2 px-4"
                            isLoading={isLoading}
                        >
                            <FaSave />
                            <span>Update</span>
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default UserSettingsForm