import "dotenv/config";
import {Client} from "minio";

export const minioClient = new Client({
	endPoint: "minio",
	port: import.meta.env.VITE_MINIO_PORT,
	useSSL: false,
	accessKey: import.meta.env.VITE_MINIO_USER,
	secretKey: import.meta.env.VITE_MINIO_PASS,
});


export const UploadFileToMinio = async (file: any): Promise<boolean> => {
	let success = false;
	try {
		await minioClient.putObject("pinsanity", file.filename, file.file, (error: any, etag: any) => {
			if (error) {
				console.log("Minio client putObject failed: ", error);

				success=false;
			} else {
				console.log("Succesfully uploaded file");
				success=true;
			}
		});
	} catch (err) {
		console.log("In upload file to minio with err: ", err);
		success = false;
	}

	return success;

};
