import { join } from 'path'
import { diskStorage, Options } from 'multer'

type UploadFolders = 'products' | 'categories'

export const FileUpload = (folder: UploadFolders): Options => ({
    storage: diskStorage({
        destination: join(__dirname, '../../../upload', folder),
        filename: (_, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
            const filename = uniqueSuffix + '-' + file.originalname
            callback(null, filename)
        }
    }),
    // limits: { fileSize: 5 * 1024 * 1024 }
})