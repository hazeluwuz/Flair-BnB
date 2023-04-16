"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = "Images";
    await queryInterface.bulkInsert(options, [
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-637090369513451459/original/1782d9d6-4a11-4d4b-b416-69c18e363f5a.jpeg?im_w=1200",
        previewImage: true,
        spotId: 1,
        userId: 1,
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-637090369513451459/original/a3f2e40c-fe00-4478-ac88-acc4b5b98c50.jpeg?im_w=720",
        previewImage: false,
        spotId: 1,
        userId: 1,
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-637090369513451459/original/21f887b0-13a1-4e61-b8db-0cb53d1ff245.jpeg?im_w=720",
        previewImage: false,
        spotId: 1,
        userId: 1,
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-637090369513451459/original/71045a7f-af14-454e-aa42-e4b5725ebbeb.jpeg?im_w=720",
        previewImage: false,
        spotId: 1,
        userId: 1,
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-637090369513451459/original/4821a099-5816-4fa3-8c78-9a367a3e4315.jpeg?im_w=720",
        previewImage: false,
        spotId: 1,
        userId: 1,
      },
      {
        url: "https://a0.muscache.com/im/pictures/1b930fe1-3759-4f25-a75c-f1737f03658c.jpg?im_w=720",
        previewImage: true,
        spotId: 2,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/913faf55-b117-4598-b6e4-ddc803a5e843.jpg?im_w=720",
        previewImage: false,
        spotId: 2,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/3b520b6f-10c8-4ff3-bda6-34376dd4d587.jpg?im_w=720",
        previewImage: false,
        spotId: 2,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/fb7df057-80dc-486c-85c3-22255da93821.jpg?im_w=720",
        previewImage: false,
        spotId: 2,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/4e2ed55b-f4ac-4534-9fc4-20c709aed42f.jpg?im_w=720",
        previewImage: false,
        spotId: 2,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/55b60914-a660-4574-8acc-50a409d29774.jpg?im_w=720",
        previewImage: true,
        spotId: 3,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/8872b154-cb58-463b-ae02-66020b11e266.jpg?im_w=720",
        previewImage: false,
        spotId: 3,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/3fb038be-15dd-43b2-92ea-538d792f70e5.jpg?im_w=720",
        previewImage: false,
        spotId: 3,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/372531bc-905f-4122-83b3-3ec3c28e9868.jpg?im_w=720",
        previewImage: false,
        spotId: 3,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/6d8b7d59-5842-48b2-b108-70812339a6b0.jpg?im_w=720",
        previewImage: false,
        spotId: 3,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/661660af-259b-4bfc-b117-1eadb902b9fd.jpg?im_w=720",
        previewImage: true,
        spotId: 4,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/1af8ed57-ab5b-4919-837e-c62a4c6313da.jpg?im_w=720",
        previewImage: false,
        spotId: 4,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/50d2af4b-f371-43f5-9f0e-6d67f2b8aed9.jpg?im_w=720",
        previewImage: false,
        spotId: 4,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/b29dc63e-8dc6-4bb4-b9c2-3ab328932c3f.jpg?im_w=720",
        previewImage: false,
        spotId: 4,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/8fc8a67c-d9f9-4251-9e5b-626279cadf70.jpg?im_w=720",
        previewImage: false,
        spotId: 4,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/cb14c73d-37af-4aa9-bff5-131c4793d04c.jpg?im_w=720",
        previewImage: true,
        spotId: 5,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/1318304e-f1a1-4ccf-9c8b-4c8c842a31b7.jpg?im_w=720",
        previewImage: false,
        spotId: 5,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/a0486e74-38ce-469b-adfd-31b75ec27170.jpg?im_w=720",
        previewImage: false,
        spotId: 5,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/0c9b09dc-6070-4b84-b12a-83fef1e0f990.jpg?im_w=720",
        previewImage: false,
        spotId: 5,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/9b1bbd9b-8f58-4cda-849d-bc301152d85d.jpg?im_w=720",
        previewImage: false,
        spotId: 5,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-26511667/original/984819d8-ac2a-4010-bd6b-c88306604275.jpeg?im_w=720",
        previewImage: true,
        spotId: 6,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-26511667/original/f142c741-0e32-4688-9919-53de96c46524.jpeg?im_w=720",
        previewImage: false,
        spotId: 6,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-26511667/original/a97b3190-976a-409f-84f7-92959dad3a85.jpeg?im_w=720",
        previewImage: false,
        spotId: 6,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-26511667/original/19db9f79-e4b3-41a4-9b8d-ddd41ff98585.jpeg?im_w=720",
        previewImage: false,
        spotId: 6,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/cb593f9d-fc45-40a6-8bc4-254765dae8c6.jpg?im_w=720",
        previewImage: false,
        spotId: 6,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/809d0d0e-2d0a-48eb-90ce-ead13e681112.jpg?im_w=720",
        previewImage: true,
        spotId: 7,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/fe2e503e-6856-4aef-a836-0f584405cde0.jpg?im_w=720",
        previewImage: false,
        spotId: 7,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/d6bd6cf2-8583-4903-8373-bc5cf8a91778.jpg?im_w=720",
        previewImage: false,
        spotId: 7,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/90a1f9b8-6a69-42df-a757-5ccc49205227.jpg?im_w=720",
        previewImage: false,
        spotId: 7,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/6b74014e-53e5-401a-82c3-96a7e9756f3e.jpg?im_w=720",
        previewImage: false,
        spotId: 7,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/178adead-53d2-4dd7-a696-bd72d2871b23.jpg?im_w=720",
        previewImage: true,
        spotId: 8,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/746d000c-f1cf-40da-a511-9bcb46ce1356.jpg?im_w=720",
        previewImage: false,
        spotId: 8,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/77178c70-edce-410f-83ee-df9b82166476.jpg?im_w=720",
        previewImage: false,
        spotId: 8,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/075c238d-b138-40e5-8500-b01fc25f6b09.jpg?im_w=720",
        previewImage: false,
        spotId: 8,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/43d53257-efd6-4184-8dac-d60c502f0996.jpg?im_w=720",
        previewImage: false,
        spotId: 8,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/026496ac-e410-4a46-a887-655ac6d0bdee.jpg?im_w=720",
        previewImage: true,
        spotId: 9,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/ebe9d078-9279-493a-90b7-36e9db472dbf.jpg?im_w=720",
        previewImage: false,
        spotId: 9,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/f3236427-76ed-4573-81af-b78f05b6c1f9.jpg?im_w=720",
        previewImage: false,
        spotId: 9,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/f6678e18-32df-499f-b8d7-1e8aed63c633.jpg?im_w=720",
        previewImage: false,
        spotId: 9,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/e30063d7-3dad-47ed-a1ec-81559cd2b33d.jpg?im_w=720",
        previewImage: false,
        spotId: 9,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/911c5c3f-d6a4-42d8-a01f-c115cf758d74.jpg?im_w=720",
        previewImage: true,
        spotId: 10,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/30ca3d1f-9e3a-4cc5-93b0-0a39c62e27f6.jpg?im_w=720",
        previewImage: false,
        spotId: 10,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/80d4e7a3-ee52-4f24-aa32-a32c7337b249.jpg?im_w=720",
        previewImage: false,
        spotId: 10,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/07c616c4-ca18-4c52-8e31-8d1695c8476c.jpg?im_w=720",
        previewImage: false,
        spotId: 10,
        userId: 2,
      },
      {
        url: "https://a0.muscache.com/im/pictures/5b212a81-3f3f-4fc8-8e56-1bf528dadfbe.jpg?im_w=720",
        previewImage: false,
        spotId: 10,
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Images";
    await queryInterface.bulkDelete(options, {
      userId: 1,
    });
  },
};
