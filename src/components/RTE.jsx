import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({
  name,
  control, // from react-hook-form we pass it when and where we use the component
  label,
  defaultValue = "",
}) {
  return (
    // we can also directly use <Editor /> like:

    // <Editor
    //   initialValue='default value'

    //   init={{
    //     branding: false,
    //     height: 500,
    //     menubar: true,
    //     plugins: [
    //       'advlist autolink lists link image charmap print preview anchor',
    //       'searchreplace visualblocks code fullscreen',
    //       'insertdatetime media table paste code help wordcount'
    //     ],
    //     toolbar: 'undo redo | formatselect | bold italic backcolor | \
    //               alignleft aligncenter alignright alignjustify | \
    //               bullist numlist outdent indent | removeformat | help'
    //     //see more from docs
    //   }}
    // />

    // but we do dot directly use <Editor /> beacuse we are making as component and we have to use it in other components and pass reference
    // so:

    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='q3ttr2ixhw5gedodkn6ohizbfmvhkc9rjvv3m73nbtn58nx2'
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              // see more doc
            }}
            onEditorChange={onChange}
          />
        )}
      />
      
    </div>
  )
}

