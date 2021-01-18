import * as AWS from 'aws-sdk';

type File = Buffer | string;

export interface FileDao {
  /**
   * Upload a file.
   *
   * @param path - path to place file
   * @param content - content of file
   */
  put(path: string, content: string | Buffer): Promise<string>;

  /**
   * Return the file (if found) base-64 encoded.
   *
   * @param path - path of file to download
   */
  get(path: string): Promise<File | undefined>;
}

export class S3Dao implements FileDao {
  private readonly bucketName: string;
  private static readonly s3Client = new AWS.S3({ apiVersion: '2006-03-01' });

  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }

  public async put(path: string, content: string | Buffer) {
    const result = await S3Dao.s3Client
      .upload({
        Bucket: this.bucketName,
        Key: path,
        Body: content
      })
      .promise();

    return result.Location;
  }

  public async get(path: string) {
    try {
      const result = await S3Dao.s3Client
        .getObject({ Bucket: this.bucketName, Key: path })
        .promise();
      if (result.Body) {
        return result.Body as File;
      }
    } catch (err) {
      // ... no-op.
    }
    return undefined;
  }
}
