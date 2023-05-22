export default function FilterWidget(props: { onOpenFilter: () => void }) {
  const openFilterSideBar = () => {
    props.onOpenFilter()
  }
  return (
      <button className="green-button button"onClick={openFilterSideBar}>Filter</button>
  );
}
