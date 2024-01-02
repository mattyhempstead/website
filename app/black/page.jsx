
export const metadata = {
    title: "Black",
}


export default function Black() {
    return (<>
        <div className="bg-black w-full h-full absolute left-0 top-0 z-[100] text-black text-center pt-10">
            <p>
                Just a fully black page to let you darken a monitor as needed.
            </p>
            <p>
                You might want to fullscreen (F11) to get the maximum effect.
            </p>
        </div>
    </>);
}
