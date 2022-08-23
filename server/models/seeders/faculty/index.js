const { Faculties } = require("../../index.model")

module.exports = () => {
    return Faculties.bulkCreate([
        {
            "id" : "f468ec6d-30a0-4e10-9dee-03fd0e70057a",
            "name" : "วิศวกรรมศาสตร์",
            "createdAt" : "2022-08-01T16:23:57.394Z",
            "updatedAt" : "2022-08-01T16:23:57.394Z"
        },
        {
            "id" : "3c2e9079-fe20-44e9-ad44-6ea2c3d95deb",
            "name" : "บริหารธุรกิจและเทคโนโลยีสารสนเทศ",
            "createdAt" : "2022-08-01T16:39:24.823Z",
            "updatedAt" : "2022-08-01T16:41:22.082Z"
        },
        {
            "id" : "39ea1955-0183-424c-af42-5d51383ae1b6",
            "name" : "ครุศาสตร์อุตสาหกรรม",
            "createdAt" : "2022-08-01T16:46:20.461Z",
            "updatedAt" : "2022-08-01T16:46:20.461Z"
        }
    ])
}