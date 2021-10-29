import * as path from 'path'

const options = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(path. __dirname, 'dist'),
  },
};

export default options