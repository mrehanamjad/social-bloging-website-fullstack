import Button from './Button';

export default function DeletePostDialog({
  isOpen=false,
  setIsOpen,
  handleDelete,
  isDeleting=false
}) {

  return (
    <div className="p-4"> 
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5">
            <h3 className="text-lg font-medium mb-3">Delete Post</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsOpen(false)}
                varient='white'
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDelete}
                isLoading={isDeleting}
                className='flex items-center justify-center'
                disabled={isDeleting}
                varient='red'
                >
                Delete
                </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}