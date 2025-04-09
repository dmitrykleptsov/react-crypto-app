import { ICrypto } from '../types/types'

const CointInfoModal = ({ coin }: { coin: ICrypto }) => {
	return <h2>{coin.name}</h2>
}

export default CointInfoModal
