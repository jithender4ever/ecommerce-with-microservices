// TODO
// Need to be a secret and not a plain text. But since this app is only being run locally, did not make it a k8s secret.
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
