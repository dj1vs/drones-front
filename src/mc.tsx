import * as Minio from 'minio'

const mc = new Minio.Client(
    {
        endPoint: '192.168.0.103',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin',
    }
)

export default mc