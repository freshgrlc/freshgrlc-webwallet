import React, { useState, useContext } from 'react';

import { AuthenticationToken } from '../../contexts/AuthenticationToken.context';

import { loginUsingSecret, loginUsingSignedChallenge, getSignatureChallenge } from '../../apis/login';
import { IChallenge } from '../../interfaces/IChallenge.interface';

export const Login: React.FC = () => {
    const tokenHolder = useContext(AuthenticationToken);

    const [ passphrase, setPassphrase ] = useState<string|undefined>();
    const [ address, setAddress ] = useState<string|undefined>();
    const [ challenge, setChallenge ] = useState<IChallenge|undefined>();
    const [ signature, setSignature ] = useState<string|undefined>();
    
    const submitSecretLogin = () => {
        if (passphrase !== undefined)
            (async () => {
                tokenHolder?.update(await loginUsingSecret(passphrase));
            })();
    };

    const submitSignatureLogin = () => {
        if (signature !== undefined)
            (async () => {
                tokenHolder?.update(await loginUsingSignedChallenge(challenge as IChallenge, signature as string));
            })();
    };

    const submitAddressForChallenge = () => {
        if (address !== undefined)
            (async () => {
                setChallenge(await getSignatureChallenge(address));
            })();
    };

    return (
        <div>
            <div>Please login</div>
            <div>
                <form action='' onSubmit={e => { submitSecretLogin(); e.preventDefault(); }}>
                    <div>
                        <input onChange={e => setPassphrase(e.target.value)}></input>
                        <input type='submit' value='Go' />
                    </div>
                </form>
            </div>
            <div>Or login using an existing address</div>
            <div>
                {challenge === undefined ? (
                    <form action='' onSubmit={e => { submitAddressForChallenge(); e.preventDefault(); }}>
                        <div>
                            <input onChange={e => setAddress(e.target.value)}></input>
                            <input type='submit' value='Go' />
                        </div>
                    </form>
                ):(
                    <>
                        <div>Please sign the folliwing challenge</div>
                        <div>{challenge.challenge}</div>
                        <div>with address {address} in your wallet</div>
                        <form action='' onSubmit={e => { submitSignatureLogin(); e.preventDefault(); }}>
                            <div>
                                <input onChange={e => setSignature(e.target.value)}></input>
                                <input type='submit' value='Go' />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
