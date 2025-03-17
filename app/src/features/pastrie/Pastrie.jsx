
export default function Pastrie ({ pastrie }) {
    
    return (
        <div className="pastrie">
            <img src={`/public/img/${pastrie.image}`} alt={ pastrie.name } />
            <p>{ pastrie.name } : <b>{ pastrie.quantity }</b></p>
        </div>
    )
}