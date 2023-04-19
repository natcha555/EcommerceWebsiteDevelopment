export const imageUpload = async(images) => {
    let imgArr = []
    for(const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", process.env.CLOUND_UPDATE_PRESENT)
        formData.append("clound_name", process.env.CLOUND_NAME)

        const res = await fetch(process.env.CLOUND_API,{
            method:"POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})

    }
    return imgArr
}