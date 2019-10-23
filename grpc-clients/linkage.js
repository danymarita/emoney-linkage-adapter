// const var_dump = require('var_dump');
const PROTO_PATH = "protos/linkage.proto";
// var async = require('async');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const grpc_server = process.env.LINKAGE_GRPC_SERVER;
const basic_auth = process.env.LINKAGE_GRPC_BASIC_AUTH;

const protoLoaderConf = protoLoader.loadSync(PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const packageDefinition = grpc.loadPackageDefinition(protoLoaderConf).id.paytech.registration;
const client = new packageDefinition.RegistrationService(grpc_server, grpc.credentials.createSsl());
const metadata = new grpc.Metadata();
metadata.add('authorization', `basic ${basic_auth}`);

module.exports = {client, metadata};