export function getFile(src: string) {
  const fileHost = process.env.NEXT_PUBLIC_FILE_HOST || process.env.NEXT_PUBLIC_API_HOST;
  return src.startsWith("http://") || src.startsWith("https://") ? src : `${fileHost}/${src}`;
}

export function objectToFormData(obj: object) {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    const value = (obj as any)[key];
    if (value instanceof Array) {
      value.forEach((v: any) => {
        formData.append(key, v);
      });
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}

export function fileToString(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isImage(file: string) {
  const fileTypes = ["jpg", "jpeg", "png", "gif", "webp"];
  const fileType = file.split(".").pop();
  if (fileTypes.includes(fileType!)) {
    return true;
  }
  return false;
}

export function generatePassword(length: number) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export function isValidEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
