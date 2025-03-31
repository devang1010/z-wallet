import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NETWORKS, NETWORK_CHAIN_ID } from '../utils/constants';

function SelectNetwork(props: any) {
    const { chainID, setChainID } = props;

    return (
        <div className="relative min-w-[180px]">
            <FormControl fullWidth size="small">
                <InputLabel 
                    id="network-select-label" 
                    className="text-gray-700 font-medium"
                >
                    Network
                </InputLabel>
                <Select
                    labelId="network-select-label"
                    value={chainID}
                    defaultValue={NETWORK_CHAIN_ID.GOERLI}
                    label="Network"
                    onChange={(e) => setChainID(e.target.value)}
                    className="bg-white rounded-lg"
                    MenuProps={{
                        PaperProps: {
                            className: 'min-w-[180px]'
                        }
                    }}
                >
                    {NETWORKS.filter(ntwrk => ntwrk.chainID !== chainID).map(ntwrk => (
                        <MenuItem
                            key={ntwrk.name + ntwrk.chainID}
                            value={ntwrk.chainID}
                            className="py-2 px-4 hover:bg-gray-50"
                        >
                            {ntwrk.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectNetwork;