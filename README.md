# Z-Wallet: Ethereum & Solana Web Extension Wallet

A secure, user-friendly cryptocurrency wallet extension supporting both Ethereum and Solana networks.

## Features

- **Multi-Chain Support**
  - Ethereum Network Integration
  - Solana Network Integration
  - Easy Network Switching

- **Wallet Management**
  - Create New Wallets
  - Import Existing Wallets
  - Multiple Account Support
  - Secure Key Storage
  - Mnemonic Phrase Backup

- **Security**
  - Password Protection
  - Encrypted Storage
  - Secure Key Management
  - Auto-logout Timer

- **Transaction Features**
  - Send/Receive Tokens
  - View Transaction History
  - Real-time Balance Updates
  - Gas Fee Estimation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/z-wallet.git
cd z-wallet
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_REACT_APP_MAINNET_PROVIDER_URL=your_ethereum_provider_url
VITE_REACT_APP_ACCOUNT_INDEX_START=0
```

4. Build the extension:
```bash
npm run build
```

5. Load the extension in Chrome:
   - Open Chrome
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## Development

Start the development server:
```bash
npm run dev
```

Build the extension:
```bash
npm run build
```

## Project Structure

```
frontend-main/
├── public/              # Static files
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # Services layer
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main component
│   └── main.jsx       # Entry point
└── vite.config.js     # Vite configuration
```

## Technologies

- React + Vite
- TypeScript
- Ethers.js
- @solana/web3.js
- Material-UI
- TailwindCSS

## Security

- All sensitive data is encrypted using strong encryption
- Private keys are never stored in plain text
- Auto-logout functionality
- Secure password requirements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/z-wallet

## Acknowledgments

- Ethereum Foundation
- Solana Foundation
- OpenZeppelin
- Material-UI Team
