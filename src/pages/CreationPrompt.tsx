import React, { useContext, useState } from 'react';

import { Wallet } from '../contexts/Wallet.context';


export const CreationPrompt: React.FC = () => {
    const wallet = useContext(Wallet);
    const [ privateKey, setPrivateKey ] = useState<string>('');

    return (
        <div>
            <div>Account does not exist</div>
            <div>
                There is currently no account bound to your login credential. If this is the first time you login
                this is normal and you can simply click 'Create new account'. However, if you are a returning user
                this might indicate that you either made a typo or otherwise logged in using the wrong information,
                in which case you should click 'Logout' and try again.
            </div>
            <div>
                <input type='button' value='Create new account' onClick={wallet?.create} />
            </div>
            <div>
                Alternatively, you can import an existing private key to use with this new wallet.
            </div>
            <div>
                Note however, that you can only link one single private key this way and there is no way to revert this process.
                Note as well that the wallet will automatically start managing the imported address, like for example consolidating
                transaction inputs so they are easier to use at a later date.
            </div>
            <div>
                <input onChange={e => setPrivateKey(e.target.value)} />
                <input type='button' value='Create new account' onClick={() => wallet?.import(privateKey)} />
            </div>
        </div>
    );
};
