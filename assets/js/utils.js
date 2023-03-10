export const lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t;
};

export const map = (num, min1, max1, min2, max2, round = false) => {
    const num1 = (num - min1) / (max1 - min1);
    const num2 = num1 * (max2 - min2) + min2;

    if (round) return Math.round(num2);

    return num2;
};

export const getNextGenImageSupport = () => {
    const dummyImages = [
        {
            type: "webp",
            url: "data:image/webp;base64,UklGRhwAAABXRUJQVlA4TBAAAAAvAAAAEAfQpv5HmQMR0f8A",
        },
        {
            type: "avif",
            url: "data:image/avif;base64,AAAAHGZ0eXBtaWYxAAAAAG1pZjFhdmlmbWlhZgAAAPFtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAHmlsb2MAAAAABEAAAQABAAAAAAEVAAEAAAAeAAAAKGlpbmYAAAAAAAEAAAAaaW5mZQIAAAAAAQAAYXYwMUltYWdlAAAAAHBpcHJwAAAAUWlwY28AAAAUaXNwZQAAAAAAAAABAAAAAQAAABBwYXNwAAAAAQAAAAEAAAAVYXYxQ4EgAAAKBzgABpAQ0AIAAAAQcGl4aQAAAAADCAgIAAAAF2lwbWEAAAAAAAAAAQABBAECg4QAAAAmbWRhdAoHOAAGkBDQAjITFkAAAEgAAAB5TNw9UxdXU6F6oA == ",
        },
    ];

    const support = {};
    const imageLoadPromises = [];

    dummyImages.map((image) => {
        let img = new Image();
        imageLoadPromises.push(
            new Promise(function (resolve, reject) {
                img.onerror = function (err) {
                    support[image.type.toLowerCase()] = false;
                    console.log("error: ", image.type);
                    reject({ [image.type.toLowerCase()]: false });
                };

                img.onload = function (inst) {
                    support[image.type.toLowerCase()] = true;
                    console.log("onload: ", image.type);

                    resolve({ [image.type.toLowerCase()]: true });
                };
            })
        );
        img.src = image.url;
    });

    return Promise.all(imageLoadPromises).then(() => support);
};
