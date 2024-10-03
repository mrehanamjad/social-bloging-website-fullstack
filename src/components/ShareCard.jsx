import React, { useRef, useState } from 'react'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TumblrIcon, TumblrShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import Button from './Button'
import { FaLink, FaShareAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

function ShareCard({ shareUrl, shareIconSize,onClickCross, className = '',showShareCard }) {

    const inputRef = useRef(null)
    const [copyBtnText, setCopyBtnText] = useState('Copy')

    function clickCopy(e) {
        const inp = inputRef.current;

        navigator.clipboard.writeText(inp.value)
            .then(() => {
                inp.select(); 
                setCopyBtnText('Copied'); 
                setTimeout(() => {
                    setCopyBtnText('Copy');
                }, 2000);
            })
            .catch((error) => {
                console.error('Error copying text: ', error);
            });
    }

    return (
        <div className={`${showShareCard ? 'flex' : 'hidden'} absolute  z-50 min-w-96 w-full rounded-2xl h-80 bg-blue-950/85 flex-col items-center justify-between pb-16 pt-5 gap-3`}>
            <div className='w-full flex flex-row-reverse px-7 '><IoClose onClick={onClickCross} className='text-white font-bold text-5xl cursor-pointer text-right bg-blue-600 rounded-full p-1 hover:bg-red-400' /></div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='text-xl text-blue-100 font-bold font-mono flex items-center gap-2'><FaShareAlt /> Share To Social Media</h1>
                <div className='flex items-center justify-center flex-wrap gap-2'>

                    <EmailShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <EmailIcon size={shareIconSize} round />
                    </EmailShareButton>

                    <WhatsappShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <WhatsappIcon size={shareIconSize} round />
                    </WhatsappShareButton>

                    <LinkedinShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <LinkedinIcon size={shareIconSize} round />
                    </LinkedinShareButton>

                    <FacebookShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <FacebookIcon size={shareIconSize} round />
                    </FacebookShareButton>

                    <FacebookMessengerShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <FacebookMessengerIcon size={shareIconSize} round />
                    </FacebookMessengerShareButton>

                    <TwitterShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <TwitterIcon size={shareIconSize} round />
                    </TwitterShareButton>

                    <TelegramShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <TelegramIcon size={shareIconSize} round />
                    </TelegramShareButton>

                    <TumblrShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <TumblrIcon size={shareIconSize} round />
                    </TumblrShareButton>

                    <PinterestShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <PinterestIcon size={shareIconSize} round />
                    </PinterestShareButton>

                    <RedditShareButton url={shareUrl} className={`p-4 ${className}`}  >
                        <RedditIcon size={shareIconSize} round />
                    </RedditShareButton>

                </div>
                <div className='p-4'>
                    <div className='px-4 py-2 bg-blue-200 border-2 border-blue-600 rounded-full flex gap-4'>
                        <input
                            type="text"
                            name='shareUrlInp'
                            value={shareUrl}
                            ref={inputRef}
                            className=' outline-none bg-transparent w-56'
                        />
                        <Button
                            varient='blue'
                            className='flex items-center gap-1 rounded-full'
                            onClick={(e) => clickCopy(e)}
                        >
                            <FaLink /> {copyBtnText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareCard