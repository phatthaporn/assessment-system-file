const { Users } = require("../../index.model");
module.exports = () => {
    return Users.bulkCreate([
        {
            "id" : "2e5c99df-94de-403d-9c1f-a1b211d11bbc",
            "firstname" : "ภัทราพร",
            "lastname" : "สุขเลิศตระกูล",
            "email" : "phatthaporn.su@rmuti.ac.th",
            "password" : "$2a$10$lYcNldZfDm3tqPGgWTF4semfxwTMFUEtXsYoFijA1NGoow\/TawOZu",
            "status" : 1,
            "approvedBy" : "jamewe1@hotmail.com",
            "createdAt" : "2022-07-13T20:09:25.000Z",
            "updatedAt" : "2022-08-01T14:33:13.551Z",
            "roleId" : "fbb84c66-5916-45bb-bc70-d1785fa5d14c"
        },
        {
            "id" : "ba36b142-14af-4997-aaff-00cabe0a4a85",
            "firstname" : "สราวุฒิ",
            "lastname" : "วงษ์เวียน",
            "email" : "jamewe1@hotmail.com",
            "password" : "$2a$10$qOqKF22h4jiU0xN\/4TskZ.Pdi3nwCsGlPNTYmayzb4IsoAh.ywNZu",
            "status" : 1,
            "approvedBy" : null,
            "createdAt" : "2022-07-13T20:09:25.000Z",
            "updatedAt" : "2022-08-01T14:36:04.645Z",
            "roleId" : "fbb84c66-5916-45bb-bc70-d1785fa5d14c"
        }
    ]);
}

