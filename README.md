# Discord Donation Notification Bot

A Discord bot designed to receive donation data through an API and send notifications about these donations to specified Discord servers. The bot integrates with [Tiptap](https://tiptap.id/), a third-party donation platform.

![Example of Tiptap Integration](/example/image.png)

## Features

- RESTful API endpoint for receiving donation data
- Persistent storage of donation data in `data.json`
- Rich Discord notifications with complete donation information
- Dynamic thumbnails based on donation amounts
- Error handling and logging middleware
- Secure API endpoints with Helmet protection
- Cross-origin resource sharing (CORS) support
- API testing suite

## Tech Stack

### Core Technologies
- Node.js
- Express.js
- Discord.js

### Middleware & Security
- Helmet (Security headers)
- CORS
- Morgan (HTTP request logging)

### Development & Testing
- Jest for API testing
- Environment configuration via dotenv
- Git for version control

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Set your Discord bot token in `BOT_TOKEN`
   - Configure other necessary environment variables

4. Start the server:
   ```bash
   npm start
   # or
   yarn start
   ```

## API Documentation

The bot exposes REST endpoints for receiving donation data. Detailed API documentation is available in the source code.

## Development

### Project Structure
```
├── src/
│   ├── api/
│   │   ├── emojis.js
│   │   └── index.js
│   ├── app.js
│   ├── index.js
│   └── middlewares.js
├── test/
│   ├── api.test.js
│   └── app.test.js
└── config.json
```

### Testing
Run the test suite:
```bash
npm test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tiptap](https://tiptap.id/) for donation platform integration
- Discord.js community for excellent documentation and support
