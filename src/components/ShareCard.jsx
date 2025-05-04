import React, { useRef, useState } from "react";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import { FaLink, FaShareAlt, FaCopy } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Input, Button } from "./";

function ShareCard({
    shareUrl,
    shareIconSize = 40,
    onClickCross,
    className = "",
    showShareCard,
}) {
    const inputRef = useRef(null);
    const [copyBtnText, setCopyBtnText] = useState("Copy");

    function clickCopy() {
        const inp = inputRef.current;

        navigator.clipboard
            .writeText(inp.value)
            .then(() => {
                inp.select();
                setCopyBtnText("Copied!");
                setTimeout(() => {
                    setCopyBtnText("Copy");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error copying text: ", error);
            });
    }

    // Social media platforms to share
    const socialPlatforms = [
        { Component: WhatsappShareButton, Icon: WhatsappIcon },
        { Component: FacebookShareButton, Icon: FacebookIcon },
        { Component: TwitterShareButton, Icon: TwitterIcon },
        { Component: LinkedinShareButton, Icon: LinkedinIcon },
        { Component: TelegramShareButton, Icon: TelegramIcon },
        { Component: EmailShareButton, Icon: EmailIcon },
        { Component: FacebookMessengerShareButton, Icon: FacebookMessengerIcon },
        { Component: PinterestShareButton, Icon: PinterestIcon },
        { Component: TumblrShareButton, Icon: TumblrIcon },
        { Component: RedditShareButton, Icon: RedditIcon },
    ];

    return (
        <div
            className={`${showShareCard ? "flex" : "hidden"
                } fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 p-4`}
        >
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ">
                {/* Close Button */}
                <div className="flex justify-end p-4 bg-blue-50 dark:bg-slate-900">
                    <button onClick={onClickCross} className="  text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900   rounded-full p-2 transition-colors">
                        <IoClose className="text-2xl" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-2 space-y-6">
                    {/* Title */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaShareAlt className="text-blue-500 text-2xl" />
                        <h2 className=" text-xl  font-semibold  text-gray-800  dark:text-gray-200">
                            Share to Social Media
                        </h2>
                    </div>

                    {/* Social Media Icons */}
                    <div className="grid grid-cols-5 gap-4 justify-center items-center">
                        {socialPlatforms.map(({ Component, Icon }, index) => (
                            <Component
                                key={index}
                                url={shareUrl}
                                className="hover:scale-110 transition-transform duration-300 ease-in-out
                                "
                            >
                                <Icon size={shareIconSize} round />
                            </Component>
                        ))}
                    </div>

                    {/* Copy Link Section */}
                    <div className="mt-4">
                        <div    className="flex items-center bg-blue-50 dark:bg-slate-700 rounded-3xlborder border-blue-200 ">
                            <Input
                                name="shareUrlInp"
                                value={shareUrl}
                                ref={inputRef}
                                readOnly
                                className="flex-grow px-3 py-2 bg-transparent text-gray-700 dark:text-gray-200 outline-none w-full"/>
                            <Button
                                variant="blue"
                                onClick={clickCopy}
                                className="flex items-center gap-2 m-1 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                            >
                                <FaCopy /> {copyBtnText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareCard;
