import loader from '../../assets/loader-cog.svg'

export default function Loader(){
    

    return (
        <div className="flex items-center gap-2">
            <img
                src={loader}
                alt="Loading"
                className="w-8 h-8 brightness-0 invert"
            />
            Loading map...
        </div>
    )
}