import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';

const WalletConnect = () => {
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [isConnecting, setIsConnecting] = useState(false);
    const [loginToken, setLoginToken] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getLoginMessage = (timestamp) => {
        return `Sign this message to authenticate. Timestamp: ${timestamp}`;
    };

    const handleAuth = async (address, signature, timestamp) => {
        try {
          const response = await fetch('https://api.polygon.dassets.xyz/auth/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: address,
              loginToken: timestamp, // 13-digit timestamp
              signature: signature
            })
          });
    
          if (!response.ok) {
            throw new Error('Authentication failed');
          }
    
          const data = await response.json();
          console.log('Response Data:', data);
          setIsAuthenticated(true);
          return data;
        } catch (err) {
          console.error("Authentication error:", err);
          throw new Error(err.message || 'Authentication failed');
        }
      };
    
      import React, { useState } from "react";
      import { BrowserProvider } from "ethers";
      
      const WalletConnect = () => {
        const [signature, setSignature] = useState("");
        const [error, setError] = useState("");
        const [isConnecting, setIsConnecting] = useState(false);
        const [loginToken, setLoginToken] = useState("");
        const [walletAddress, setWalletAddress] = useState("");
        const [isAuthenticated, setIsAuthenticated] = useState(false);
      
        const getLoginMessage = (timestamp) => {
          return Signature for login authentication: 1730278426553;
        };
      
        const handleAuth = async (address, signature, timestamp) => {
          try {
            const response = await fetch(
              "https://api.polygon.dassets.xyz/auth/user/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: address,
                  loginToken: 1730278426553,
                  signature: signature,
                }),
              }
            );
      
            if (!response.ok) {
              throw new Error("Authentication failed");
            }
      
            const data = await response.json();
            console.log("====================================");
            console.log(data);
            console.log("====================================");
            setIsAuthenticated(true);
            return data;
          } catch (err) {
            console.error("Authentication error:", err);
            throw new Error(err.message || "Authentication failed");
          }
        };
      
        const connectAndSign = async () => {
          setIsConnecting(true);
          setError("");
          setSignature("");
          setLoginToken("");
      
          try {
            if (!window.ethereum) {
              throw new Error("MetaMask is not installed!");
            }
      
            // Create provider and request accounts
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
      
            // Get signer and address
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
      
            // Create unix timestamp for login token
            const timestamp = Math.floor(Date.now() / 1000);
            setLoginToken(timestamp.toString());
      
            // Sign message with timestamp
            const message = getLoginMessage(timestamp);
            const signedMessage = await signer.signMessage(message);
            setSignature(signedMessage);
      
            // Authenticate with the server
            await handleAuth(address, signedMessage, timestamp);
          } catch (err) {
            console.error("Error:", err);
            setError(err instanceof Error ? err.message : "Unknown error occurred");
            setIsAuthenticated(false);
          } finally {
            setIsConnecting(false);
          }
        };
      
        const shortenAddress = (address) => {
          if (!address) return "";
          return `${address.substring(0, 6)}...${address.substring(
            address.length - 4
          )}`;
        };
      
        return (
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                onClick={connectAndSign}
                disabled={isConnecting}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: isAuthenticated ? "#ddd" : "#007bff",
                  color: "#fff",
                  cursor: isConnecting ? "not-allowed" : "pointer",
                  marginBottom: "15px",
                  width: "100%",
                }}
              >
                {isConnecting
                  ? "Connecting..."
                  : isAuthenticated
                  ? "Connected"
                  : walletAddress
                  ? "Sign Again"
                  : "Connect Wallet"}
              </button>
      
              {walletAddress && (
                <div
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                    textAlign: "center",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {shortenAddress(walletAddress)}
                </div>
              )}
      
              {isAuthenticated && (
                <div
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}
                >
                  Successfully authenticated!
                </div>
              )}
      
              {error && (
                <div
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    borderRadius: "6px",
                  }}
                >
                  {error}
                </div>
              )}
      
              {/* Display Unix Timestamp and Signed Message */}
              {loginToken && (
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#e9ecef",
                    borderRadius: "6px",
                    textAlign: "center",
                  }}
                >
                  <strong>Unix Timestamp:</strong> {loginToken}
                </div>
              )}
              {signature && (
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#e9ecef",
                    borderRadius: "6px",
                    textAlign: "center",
                  }}
                >
                  <strong className="">Signed Message:</strong> {signature}
                </div>
              )}
            </div>
          </div>
        );
      };
      
      export default WalletConnect;

    const shortenAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <button
                    onClick={connectAndSign}
                    disabled={isConnecting}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: isAuthenticated ? '#ddd' : '#007bff',
                        color: '#fff',
                        cursor: isConnecting ? 'not-allowed' : 'pointer',
                        marginBottom: '15px',
                        width: '100%',
                    }}
                >
                    {isConnecting ? 'Connecting...' : isAuthenticated ? 'Connected' : walletAddress ? 'Sign Again' : 'Connect Wallet'}
                </button>

                {walletAddress && (
                    <div style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        textAlign: 'center',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        marginBottom: '10px',
                    }}>
                        {shortenAddress(walletAddress)}
                    </div>
                )}

                {isAuthenticated && (
                    <div style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        borderRadius: '6px',
                        marginBottom: '10px',
                    }}>
                        Successfully authenticated!
                    </div>
                )}

                {error && (
                    <div style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '6px',
                    }}>
                        {error}
                    </div>
                )}

                {/* Display Unix Timestamp and Signed Message */}
                {loginToken && (
                    <div style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '6px', textAlign: 'center' }}>
                        <strong>Unix Timestamp:</strong> {loginToken}
                    </div>
                )}
                {signature && (
                    <div style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '6px', textAlign: 'center' }}>
                        <strong className=''>Signed Message:</strong> {signature}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletConnect;
