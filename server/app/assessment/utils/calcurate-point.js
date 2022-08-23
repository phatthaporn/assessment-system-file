module.exports = async(answer) => {
    switch(answer) {
        case "excellent":
            return 5;
        case "good":
            return 4;
        case "standard":
            return 3;
        case "fair":
            return 2;
        case "bad":
            return 1;
        case "so bad":
            return 0;
        case "":
            return 0;
    }
}