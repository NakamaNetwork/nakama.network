import { S3Dao } from '../file-dao';

jest.mock('aws-sdk', () => ({
  S3: jest.fn().mockReturnValue({
    upload: jest.fn().mockReturnValue({
      promise: jest.fn().mockReturnValue({ Location: 'file' })
    }),
    getObject: jest.fn().mockReturnValue({
      promise: jest.fn().mockReturnValue({ Body: JSON.stringify({ content: 'File Content' }) })
    })
  })
}));

describe('s3-dao', () => {
  const dao = new S3Dao('test-bucket');
  describe('put', () => {
    it('returns the location of the put file', async () => {
      expect.assertions(1);
      const result = await dao.put('hello.txt', JSON.stringify({ content: 'yes' }));
      expect(result).toBe('file');
    });
  });

  describe('get', () => {
    it('returns the base64 encoded file', async () => {
      expect.assertions(2);
      const result = await dao.get('file.txt');
      expect(result).toBeDefined();
      const base64Decoded = Buffer.from(result!).toString('ascii');
      expect(base64Decoded).toEqual(JSON.stringify({ content: 'File Content' }));
    });
  });
});
