import { blurhashThis } from '../src/utils/blur';

test('hash from url', () => blurhashThis('https://solidstarts.com/wp-content/uploads/when-can-babies-eat-watermelon.jpg')
  .then(hash => expect(hash).toBe("UULyTVGXG@,?u4R5xatRP;-qz=t7r^NwRjS4"))
)

test('fail hash from url', () => blurhashThis(process.cwd() + 'https://solidstarts.com/wp-broken/uploads/when-can-babies-eat-watermelon.jpg')
  .catch(e => expect(e.message).toBe("Input file is missing"))
)

test('hash from local file', () => blurhashThis(process.cwd() + '/test/image/picklerick.jpeg')
  .then(hash => expect(hash).toBe("UJFZsH%g=kxu%4xcNEOQRSWmR$s=xuofs;e?"))
)

test('fail hash from local file', () => blurhashThis(process.cwd() + '/test/broken/picklerick.jpeg')
  .catch(e => expect(e.message).toBe("Input file is missing"))
)