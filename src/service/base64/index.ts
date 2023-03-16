export const getBase64 = (file: any) => {
    var reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort()
            reject(new DOMException('Problem parsing input file.'))
        }
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsDataURL(file)
    })
}
