function DetailSection({title,content}){
    if (!content ) return null;
    return (
        <section> 
            <p className="font-bold mb-1">{title}</p>
            {Array.isArray(content) ? (
                <ul className="ml-4">
                    {content.map((elem, index) => (
                        <li className="list-disc" key={index}>
                            {elem}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{content}</p>
            )}
        </section>
    )
}

export default DetailSection;