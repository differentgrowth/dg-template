declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test"

		PAYLOAD_SECRET: string
		PREVIEW_SECRET: string
		BLOB_READ_WRITE_TOKEN: string
		DATABASE_URI: string

		[key: string]: string | undefined
	}
}
