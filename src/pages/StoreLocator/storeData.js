const stores = [
    {
        forInstaller: true,
        forEndUser: true,
        images: {
            "image1": "https://images.pexels.com/photos/3423860/pexels-photo-3423860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image2": "https://images.pexels.com/photos/942320/pexels-photo-942320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image3": "https://images.pexels.com/photos/14020919/pexels-photo-14020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        name: "Hikvision Colombia SAS",
        position: [4.7110, -74.0721],
        address: "Calle 123 #45-67, Bogotá",
        hours: [
            { day: "Monday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Tuesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
            { day: "Sunday", open: "11:00 AM", close: "5:00 PM" }
        ],
        phone: "+57 1 234 5678",
        website: "https://hikstore1.com",
    },
    {
        forInstaller: false,
        forEndUser: true,
        images: {
            "image1": "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image2": "https://images.pexels.com/photos/2345678/pexels-photo-2345678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image3": "https://images.pexels.com/photos/3456789/pexels-photo-3456789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        name: "Hikstore 2",
        position: [4.6097, -74.0817],
        address: "Carrera 7 #89-12, Bogotá",
        hours: [
            { day: "Monday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Tuesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
            { day: "Sunday", open: "11:00 AM", close: "5:00 PM" }
        ],
        phone: "+57 1 876 5432",
        website: "https://hikstore2.com",
    },
    {
        forInstaller: true,
        forEndUser: false,
        images: {
            "image1": "https://images.pexels.com/photos/567890/pexels-photo-567890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image2": "https://images.pexels.com/photos/678901/pexels-photo-678901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image3": "https://images.pexels.com/photos/789012/pexels-photo-789012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        name: "Hikstore 3",
        position: [4.6483, -74.2479],
        address: "Avenida 68 #45-50, Bogotá",
        hours: [
            { day: "Monday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Tuesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
            { day: "Sunday", open: "11:00 AM", close: "5:00 PM" }
        ],
        phone: "+57 1 345 6789",
        website: "https://hikstore3.com",
    },
    {
        forInstaller: true,
        forEndUser: false,
        images: {
            "image1": "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image2": "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image3": "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        name: "Hikstore 4",
        position: [4.7100, -74.0721],
        address: "Carrera 7 #12-34, Bogotá",
        hours: [
            { day: "Monday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Tuesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Wednesday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
            { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
            { day: "Sunday", open: "11:00 AM", close: "5:00 PM" }
        ],
        phone: "+57 1 456 7890",
        website: "https://hikstore4.com"
    },
    {
        forInstaller: true,
        forEndUser: false,
        images: {
            "image1": "https://images.pexels.com/photos/4564564/pexels-photo-4564564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image2": "https://images.pexels.com/photos/5675675/pexels-photo-5675675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image3": "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        name: "Hikstore 5",
        position: [4.6533, -74.0935],
        address: "Calle 26 #15-20, Bogotá",
        hours: [
            { day: "Monday", open: "8:00 AM", close: "7:00 PM" },
            { day: "Tuesday", open: "8:00 AM", close: "7:00 PM" },
            { day: "Wednesday", open: "8:00 AM", close: "7:00 PM" },
            { day: "Thursday", open: "8:00 AM", close: "7:00 PM" },
            { day: "Friday", open: "8:00 AM", close: "7:00 PM" },
            { day: "Saturday", open: "9:00 AM", close: "5:00 PM" },
            { day: "Sunday", open: "10:00 AM", close: "4:00 PM" }
        ],
        phone: "+57 1 567 8901",
        website: "https://hikstore5.com"
    },
    {
        forInstaller: false,
        forEndUser: true,
        images: {
            "image1": "https://images.pexels.com/photos/7897897/pexels-photo-7897897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image2": "https://images.pexels.com/photos/8908908/pexels-photo-8908908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "image3": "https://images.pexels.com/photos/9019019/pexels-photo-9019019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        name: "Hikstore 6",
        position: [4.6278, -74.0793],
        address: "Carrera 10 #15-45, Bogotá",
        hours: [
            { day: "Monday", open: "10:00 AM", close: "9:00 PM" },
            { day: "Tuesday", open: "10:00 AM", close: "9:00 PM" },
            { day: "Wednesday", open: "10:00 AM", close: "9:00 PM" },
            { day: "Thursday", open: "10:00 AM", close: "9:00 PM" },
            { day: "Friday", open: "10:00 AM", close: "9:00 PM" },
            { day: "Saturday", open: "11:00 AM", close: "6:00 PM" },
            { day: "Sunday", open: "11:00 AM", close: "5:00 PM" }
        ],
        phone: "+57 1 678 9012",
        website: "https://hikstore6.com"
    }
];


export default stores;