// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArtistView() {
    const [ artistData, setArtistData ] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:4000/album/${id}`
            const response = await fetch(url)
            const data = await response.json()

            const albums = data.results.filter(item => item.collectionType === 'Album')
            setArtistData(albums)
        }

        fetchData()
    }, [id])

    const albumDisplay = artistData.map(album => {
        return (
            <div key={album.collectionId}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    return (
        <div>
            <p>Artist Data Goes Here!</p>
            <p>ID: {id}</p>
            {albumDisplay}
        </div>
    )
}

export default ArtistView