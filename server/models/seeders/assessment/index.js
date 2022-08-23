const { Assessments } = require("../../index.model")

module.exports = () => {
    return Assessments.bulkCreate([
        {
            "id" : "5fab692d-b214-4063-b4fd-d9e353447fbc",
            "title" : "การแข่งขันโครงการราชมงคลวิชาการวิศวกรรมศาสตร์ระดับชาติ ครั้งที่ 13",
            "sub_title" : "แบบประเมินผลนี้มีวัตถุประสงค์เพื่อสำรวจความคิดเห็นเกี่ยวกับโครงการ \"การแข่งขันโครงการราชมงคลวิชาการวิศวกรรมศาสตร์ระดับชาติ ครั้งที่ 13\"",
            "createdAt" : "2022-08-16T10:20:54.669Z",
            "updatedAt" : "2022-08-16T10:22:54.801Z",
            "deletedAt" : null,
            "userId" : "ba36b142-14af-4997-aaff-00cabe0a4a85",
            "facultyMajorId" : "c2c73e36-374e-456a-9569-6666e43badcb"
        }
    ])
}