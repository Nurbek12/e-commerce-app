# for node js
npx proto-loader-gen-types --longs=String --enums=String --defaults --keepCase --oneofs --grpcLib=@grpc/grpc-js --outDir=pb/ protos/*.proto

# for nest js
protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=./gen -I="./protos" --ts_proto_opt=nestJs=true ./protos/products.proto

# grpcui -plaintext localhost:5000