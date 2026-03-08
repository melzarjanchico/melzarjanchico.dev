import './App.css'
import ClickSpark from './components/ClickSpark'
import BackgroundGrainient from './sections/BackgroundGrainient'
import Header from './sections/Header'
import { MY_EDUCATION, MY_EMPLOYMENT } from './data/experience'
import MyExperience from './sections/MyExperience'
import { Card } from './components/ui/card'

function App() {
  return (
    <>
      <ClickSpark
        sparkColor="#000"
        sparkSize={5}
        sparkRadius={10}
        sparkCount={6}
        duration={200}
      >
        <div className="relative bg-white transition-colors duration-300">

          {/* Grainient background */}
          <BackgroundGrainient/>

          {/* Content area */}
          <div className="relative h-screen overflow-y-auto flex flex-col gap-6 items-center justify-start py-10 pt-10 lg:pt-15">

            {/* Header */}
            <Header/>

            {/* History/Education */}
            <MyExperience history={[
              ...MY_EMPLOYMENT.map(job => ({ ...job, itemType: "work" })),
              ...MY_EDUCATION.map(school => ({ ...school, itemType: "school" }))
            ]}/>

            <Card className='mx-auto w-full max-w-md px-6 py-8 lg:px-12 lg:max-w-4xl select-none relative'>
              Test
            </Card>

          </div>
        </div>
      </ClickSpark>
      
    </>
  )
}

export default App
