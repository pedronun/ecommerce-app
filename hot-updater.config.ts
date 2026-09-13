/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expo } from '@hot-updater/expo';
import { firebaseDatabase, firebaseStorage } from '@hot-updater/firebase';
import * as admin from 'firebase-admin';
import { config } from 'dotenv';
import { defineConfig } from 'hot-updater';

config({ path: '.env.hotupdater' });

const credential = admin.credential.applicationDefault();

export default defineConfig({
  build: expo({
    sourcemap: false,
  }),
  storage: firebaseStorage({
    projectId: process.env.HOT_UPDATER_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.HOT_UPDATER_FIREBASE_STORAGE_BUCKET!,
    credential,
  }),
  database: firebaseDatabase({
    projectId: process.env.HOT_UPDATER_FIREBASE_PROJECT_ID!,
    credential,
  }),
  signing: {
    enabled: true,
    privateKeyPath: './keys/private-key.pem',
  },
  console: {
    gitUrl: 'https://github.com/pedronun/ecommerce-app',
  },
  updateStrategy: 'appVersion',
});
