import {useRef, useState} from "react";
import useClickOutside from "@/hooks/useClickOutside";
import {fireEvent, render} from "@testing-library/react";

type Props = {
    onClickOutside: () => void;
}

describe("useClickOutside()", () => {
    function TestComponent({onClickOutside}: Props) {
        const ref = useRef<HTMLDivElement>(null);
        const [show, setShow] = useState(true);

        useClickOutside(ref, () => {
            setShow(false);
            onClickOutside();
        });

        return (
            <div>
                <div ref={ref} data-testid="Inside">Inside</div>
                {show && <div data-testid="Show">Visible</div>}
            </div>
        );
    }

    it ("should hide the element when clicked outside", () => {
    const mockFn = jest.fn();
    const {getByTestId, queryByTestId} = render(<TestComponent onClickOutside={mockFn} />);
        expect(getByTestId("Show")).toBeInTheDocument();
        fireEvent.mouseDown(document.body);
        expect(queryByTestId("Show")).not.toBeInTheDocument();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should not hide the element when clicked inside", () => {
    const mockFn = jest.fn();
    const {getByTestId} = render(<TestComponent onClickOutside={mockFn} />);
        fireEvent.mouseDown(getByTestId("Inside"));
        expect(getByTestId("Show")).toBeInTheDocument();
        expect(mockFn).not.toHaveBeenCalled()
    });
});