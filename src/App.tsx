import useJsonFetch from './_hooks/useJsonFetch'
import './App.css'


interface ComponentProps {
  url: string;
  title: string;
}

const DataComponent: React.FC<ComponentProps> = ({ url, title }) => {
  const [data, loading, error] = useJsonFetch(url, {});


  return (
    <div style={{ border: '1px solid', margin: "3px" }}>
      <h2>{title}</h2>

      {loading && <div>Loading...</div>}
      {error && <p>Error: {error}</p>}
      
      {!loading && !error && (
        <>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

function App() {

  return (
    <div style={{ display: 'flex' }}>
      <DataComponent url="http://localhost:7070/data" title="Data Component"/>
      <DataComponent url="http://localhost:7070/error" title="Error Component"/>
      <DataComponent url="http://localhost:7070/loading" title="Loading Component"/>
    </div>
  )
}

export default App
