import React, { useState } from 'react';

import { loginUsingSecret, loginUsingSignedChallenge, getSignatureChallenge } from '../../apis/login';
import { IChallenge } from '../../interfaces/IChallenge.interface';
import { useHistory } from 'react-router-dom';
import { useTokenContext } from '../../contexts/Token.context';

export const Login: React.FC = () => {
    const { update } = useTokenContext();
    const history = useHistory();

    const [passphrase, setPassphrase] = useState<string | undefined>();
    const [address, setAddress] = useState<string | undefined>();
    const [challenge, setChallenge] = useState<IChallenge | undefined>();
    const [signature, setSignature] = useState<string | undefined>();

    const submitSecretLogin = async () => {
        if (passphrase !== undefined) {
            const token = await loginUsingSecret(passphrase);
            if (token !== undefined) {
                update(token);
                history.push('/');
            }
        }
    };

    const submitSignatureLogin = async () => {
        if (signature !== undefined && challenge !== undefined) {
            const token = await loginUsingSignedChallenge(challenge, signature);
            if (token !== undefined) {
                update(token);
                history.push('/');
            }
        }
    };

    const submitAddressForChallenge = async () => {
        if (address !== undefined) {
            setChallenge(await getSignatureChallenge(address));
        }
    };

    return (
        <div>
            <div>Please login</div>
            <div>
                <form
                    action=""
                    onSubmit={(e) => {
                        submitSecretLogin();
                        e.preventDefault();
                    }}
                >
                    <div>
                        <input onChange={(e) => setPassphrase(e.target.value)}></input>
                        <input type="submit" value="Go" />
                    </div>
                </form>
            </div>
            <div>Or login using an existing address</div>
            <div>
                {challenge === undefined ? (
                    <form
                        action=""
                        onSubmit={(e) => {
                            submitAddressForChallenge();
                            e.preventDefault();
                        }}
                    >
                        <div>
                            <input onChange={(e) => setAddress(e.target.value)}></input>
                            <input type="submit" value="Go" />
                        </div>
                    </form>
                ) : (
                    <>
                        <div>Please sign the folliwing challenge</div>
                        <div>{challenge.challenge}</div>
                        <div>with address {address} in your wallet</div>
                        <form
                            action=""
                            onSubmit={(e) => {
                                submitSignatureLogin();
                                e.preventDefault();
                            }}
                        >
                            <div>
                                <input onChange={(e) => setSignature(e.target.value)}></input>
                                <input type="submit" value="Go" />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
