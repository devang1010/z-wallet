import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formatEth } from '../utils/ethers';

function SelectAsset(props: any) {
    const { assets, setAssets, currentAsset, setCurrentAsset, accountBalance } = props;
    const [error, setError] = useState('');

    const handleAssetChange = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        e.preventDefault();
        const current = assets[index] ?? null;
        if (!current) {
            setError('token not found');
            return;
        }
        setCurrentAsset(current);
    };

    return (
        <div className="w-full max-w-[250px]">
            <FormControl fullWidth>
                <InputLabel id="asset-select-label" className="text-gray-600">
                    Asset
                </InputLabel>
                <Select
                    labelId="asset-select-label"
                    value={currentAsset.symbol}
                    label="Assets"
                    className="h-16"
                >
                    {assets?.map((asset: any, index: number) => (
                        <MenuItem
                            key={asset.symbol + index}
                            value={asset.symbol}
                            onClick={(e) => handleAssetChange(e, index)}
                            className="flex flex-col items-start"
                        >
                            <div className="flex items-center gap-3">
                                <img 
                                    src={asset.icon ?? ""}
                                    alt={`${asset.symbol} icon`}
                                    className="w-6 h-6 rounded-full border border-gray-200"
                                />
                                <span>{asset.symbol}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Balance: {Number(formatEth(accountBalance)).toFixed(8)}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
                {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
            </FormControl>
        </div>
    );
}

export default SelectAsset;