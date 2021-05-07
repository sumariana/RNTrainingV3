import { Alert } from "react-native";
import Moment from 'moment';

export const getErrorMessage = (err) => {
    console.log(err)
    if (err.message === "Network Error") {
        throw new Error("Periksa Koneksi Internet Anda");
    } else if (err.response.data.error != null) {
        console.log(err)
        const errorData = err.response.data;
        const errorMessage = errorData.error.errors[0].message
        console.log(errorMessage);
        switch (errorMessage) {
            case "Unauthenticated":
                throw Error("Data Anda Belum Terdaftar");
            case "The email has already been taken.":
                throw Error("Email yang anda gunakan telah terdaftar");
            case "The phone has already been taken.":
                throw Error("Nomor Handphone yang anda gunakan telah terdaftar");
            case "Unauthenticated.":
                throw Error("Anda Tidak Memiliki Akses, Silahkan Login Ulang");
            case "Wrong password":
                throw Error("Kata Sandi Lama Salah. Pastikan Kata Sandi Lama Anda Benar");
            case "Password anda salah":
                throw Error("Kata Sandi Anda Salah");
            default:
                throw Error(errorMessage);
        }
    } else {
        throw new Error("Terjadi Kesalahan Pada Server")
    }
};

export const showErrorAlert = (message) => {
    setTimeout(() => {
            Alert.alert( "Something Is Wrong", message, [
                { 
                    text: "OK",
                }
            ]);
    }, 200)
}

export const getDateTime = (dateTime,format) => {
    const dateString = Moment(dateTime).format(format)
    // const date = new Date(dateTime*1000);
    // const hours = (`0${date.getUTCHours() + 7}`).slice(-2);
    // const minutes = (`0${date.getMinutes()}`).slice(-2);
    // return isDetail ? `${hours}:${minutes} ${date.getDate()} ${monthShortNames[date.getMonth()]} ${date.getFullYear()}` : `${date.getDate()} ${monthShortNames[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes}`
    return dateString
};

export const convertStringDate=(fromFormat,toFormat)=>{
    const fromDate = Moment(fromFormat,'YYYY-MM-DD HH:mm').toDate()
    const toFormatDateString = getDateTime(fromDate,toFormat)
    return toFormatDateString
}