import SkeletonElement from "./SkeletonElement";

const SkeletonRepo = () => {

    return(
        <div>
            <SkeletonElement type="headTitle"/>
            <div className="SkeletonRepoBlock">
                <SkeletonElement type="title"/>
                <SkeletonElement type="description"/>
            </div> 
        </div>
    );
}

export default SkeletonRepo;