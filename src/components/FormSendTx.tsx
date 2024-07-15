'use client'

import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'
import bs58 from 'bs58'

import { walletAtom } from '@/store/walletAtom'
import { rpc } from '@/utils/config'

export function FormSendTx() {
  const [walletState] = useAtom(walletAtom)
  const [{ amountSol, toAddress }, setDataTransfer] = React.useState({
    amountSol: 0,
    toAddress: ''
  })
  const [signature, setSignature] = React.useState('')

  const handleSendTx = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!walletState.myKeyPair) {
      console.log('please create new wallet')
      return
    }

    if (amountSol <= 0) {
      console.log('small amount sol')
      return
    }

    const bytes = bs58.decode(toAddress)
    if (bytes.length != 32) {
      console.log('invalid length address')
      return
    }

    if (!PublicKey.isOnCurve(bytes)) {
      console.log('invalid pubkey')
      return
    }

    try {
      const toPubkey = new PublicKey(bytes)
      const lamportsPerSolBigNum = BigNumber(LAMPORTS_PER_SOL)
      const amountSolBigNum = BigNumber(amountSol)
      const amountLamportsToTransfer =
        lamportsPerSolBigNum.multipliedBy(amountSolBigNum)

      const myKeyPair = walletState.myKeyPair

      const instructions: TransactionInstruction[] = [
        SystemProgram.transfer({
          fromPubkey: new PublicKey(myKeyPair.publicKey),
          toPubkey,
          lamports: amountLamportsToTransfer.toNumber()
        })
      ]
      const latestBlockhash = await rpc.getLatestBlockhash('confirmed')
      const messageV0 = new TransactionMessage({
        payerKey: myKeyPair.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions
      }).compileToV0Message()
      const tx = new VersionedTransaction(messageV0)
      tx.sign([myKeyPair])

      const signature = await rpc.sendTransaction(tx, {
        preflightCommitment: 'confirmed',
        skipPreflight: false,
        maxRetries: 10
      })

      if (signature) {
        setSignature(signature)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return (
    <form className="flex flex-col max-w-[500px] mx-auto">
      <input
        className="bg-transparent border-2 p-3 rounded-lg"
        placeholder="SOL"
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDataTransfer((prev) => ({
            ...prev,
            amountSol: Number(e.target.value)
          }))
        }
      />
      <input
        className="bg-transparent border-2 p-3 rounded-lg mt-4"
        placeholder="address"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDataTransfer((prev) => ({
            ...prev,
            toAddress: e.target.value
          }))
        }
      />
      <button
        className="bg-teal-900 font-bold p-3 rounded-lg text-lg mt-4"
        onClick={handleSendTx}
      >
        send
      </button>

      {signature ? (
        <div className="mt-2">
          please check status in explorer
          <Link
            className="bg-blue-500 font-bold p-1 rounded-lg text-lg"
            href={`https://solscan.io/tx/${signature}?cluster=devnet`}
            rel="noreferrer"
            target="_blank"
          >
            check
          </Link>
        </div>
      ) : null}
    </form>
  )
}
