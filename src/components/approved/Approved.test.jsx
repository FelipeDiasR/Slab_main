import {render, screen} from "@testing-library/react";
import Approved from "./Approved";


describe(' Approved Component', () => {

   it("should render corretly", () => {

    render (<Approved/>);
    expect(screen.getByTestId("approved")).toBeInTheDocument();
   });  
    
    
}) 