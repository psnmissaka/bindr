# Bindr
This is a simple NodeJS project that binds two cat images together with texts of your choice. This uses Cat as a Service
(https://cataas.com).

## How Bindr works

1. Fetches an image of a cat with some custom text
2. Fetches an image of another cat with some more custom text
3. Binds these images together into one image
4. Saves the resulting image as a file

## How to run Bindr
When running Bindr, users can input following properties. 
- `greeting` - Greeting text 
- `who` - Name text
- `width` - Width of the image
- `height` - Height of the image
- `color` - Color of the text
- `size` - Size of the text

### Run with defaults
You can run the Bindr by running `npm start` command.

### Running with custom inputs
If you want to pass custom inputs for different properties, you can run bindr as follows.

Ex:
- Custom greeting text  - `node index.js --greeting welcome`
- Text color blue       - `node index.js --color Blue`

### Running tests
Run the command ``

### Running with Docker

