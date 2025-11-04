import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildConfig } from "payload";

import sharp from "sharp";

import { autoLogin } from "@/payload-config/auto-login";
import { avatar } from "@/payload-config/avatar";
import { collections } from "@/payload-config/collections";
import { components } from "@/payload-config/components";
import { db } from "@/payload-config/db";
import { editor } from "@/payload-config/editor";
import { email } from "@/payload-config/email";
import { folders } from "@/payload-config/folders";
import { globals } from "@/payload-config/globals";
import { i18n } from "@/payload-config/i18n";
import { jobs } from "@/payload-config/jobs";
import { livePreview } from "@/payload-config/live-preview";
import { meta } from "@/payload-config/meta";
import { plugins } from "@/payload-config/plugins";
import { timezones } from "@/payload-config/timezones";
import { upload } from "@/payload-config/upload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  bin: [
    {
      scriptPath: path.resolve(dirname, "seed.ts"),
      key: "seed",
    },
  ],
  routes: {
    api: "/admin-api",
  },
  i18n,
  admin: {
    autoLogin,
    user: "users",
    livePreview,
    meta,
    dateFormat: "LLL dd, y - HH:mm",
    theme: "all",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    timezones,
    components,
    avatar,
  },
  collections,
  globals,
  folders,
  editor,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db,
  sharp,
  upload,
  plugins,
  email,
  jobs,
});
