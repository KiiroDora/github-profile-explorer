import SkeletonElement from "./SkeletonElement";

const SkeletonCard = () => {

    return(
        <div>
            <div className="UserCard">
                <div className="Header">
                    <SkeletonElement type="text"/>
                    <SkeletonElement type="subtitle"/>
                </div> 
            </div>
            <SkeletonElement type="avatar"/>
        </div>
    );
}

export default SkeletonCard;