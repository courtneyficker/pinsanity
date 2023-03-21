import "dotenv/config";
import {Client} from "minio";

export const minioClient = new Client({
	endPoint: "minio",
	//port: import.meta.env.VITE_MINIO_PORT,
	port: 9000,
	useSSL: false,
	accessKey: import.meta.env.VITE_MINIO_USER,
	secretKey: import.meta.env.VITE_MINIO_PASS,
});


export const UploadFileToMinio = async (filename: string, file: any): Promise<boolean> => {
	let success = false;
	try {
		await minioClient.putObject("pinsanity", filename, file, (error: any, etag: any) => {
			if (error) {
				console.log("Minio client putObject failed: ", error);

				success=false;
			} else {
				console.log("Succesfully uploaded file");
				success=true;
			}
		});
	} catch (err) {
		console.log("InUploadFileToMinio with err: ", err);
		success = false;
	}

	return success;

};

export const GetFileFromMinio = async (filename: string): Promise<boolean> => {
	let success = false;
	try {
        await minioClient.getObject("pinsanity", filename, (error: any, etag: any) => {
			if (error) {
				console.log("Minio client getObject failed: ", error);

				success=false;
			} else {
				// console.log("Succesfully retrieved file");
				success=true;
			}
		});
	} catch (err) {
		console.log("In retrieve file from minio with err: ", err);
		success = false;
	}

	return success;
};
