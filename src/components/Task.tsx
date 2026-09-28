import FAIcon from "./FAIcon";
import Swal from "sweetalert2";

interface properties {
  title: string;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  isDone: boolean;
}

export default function Task(props: properties) {
  const { title, countdown, isDone } = props;

  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: `Edit countdown for "${title}"`,
      html:
        `<input id="swal-hours" class="swal2-input" placeholder="Hours" type="number" value="${countdown.hours}">` +
        `<input id="swal-minutes" class="swal2-input" placeholder="Minutes" type="number" value="${countdown.minutes}">` +
        `<input id="swal-seconds" class="swal2-input" placeholder="Seconds" type="number" value="${countdown.seconds}">`,
      focusConfirm: false,
      confirmButtonText: "Save",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const hours = parseInt((document.getElementById("swal-hours") as HTMLInputElement).value);
        const minutes = parseInt((document.getElementById("swal-minutes") as HTMLInputElement).value);
        const seconds = parseInt((document.getElementById("swal-seconds") as HTMLInputElement).value);

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
          Swal.showValidationMessage("Please enter valid numbers for all fields");
          return;
        }

        return { hours, minutes, seconds };
      }
    });

    if (formValues) {
      try {
        const response = await fetch(`/api/edit/${encodeURIComponent(title)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ countdown: formValues }),
        });

        if (!response.ok) throw new Error("Failed to update the task");

        await Swal.fire("Success", "Task updated successfully ✅", "success");
        window.location.reload();
      } catch (err) {
        Swal.fire("Error", err instanceof Error ? err.message : "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <label htmlFor={`check${title}`} className="flex items-center justify-between w-full">
        <span className="text-white flex-1">{title}</span>

        <span className="countdown font-mono text-2xl min-w-[120px] text-center flex-shrink-0">
          <span style={{ "--value": countdown.hours } as React.CSSProperties} aria-label={countdown.hours.toString()} />
          :
          <span style={{ "--value": countdown.minutes } as React.CSSProperties} aria-label={countdown.minutes.toString()} />
          :
          <span style={{ "--value": countdown.seconds } as React.CSSProperties} aria-label={countdown.seconds.toString()} />
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={handleEdit} className="btn btn-active w-[50px] btn-warning">
            <FAIcon prefix="fas" name="pen-to-square" />
          </button>

          <button
            onClick={async () => {
              await fetch(`/api/delete/${encodeURIComponent(title)}`, {
                method: "DELETE",
              });
              window.location.reload();
            }}
            className="btn btn-active w-[50px] btn-error"
          >
            <FAIcon prefix="fas" name="trash" />
          </button>
        </div>

        <input
          id={`check${title}`}
          onChange={async (e) => {
            const isChecked = e.target.checked;
            await fetch(`/api/done/${encodeURIComponent(title)}`, {
              method: "POST",
            });
            console.log(`Task ${title} marked as done: ${isChecked}`);

            const newData = await fetch(`/api/search/${encodeURIComponent(title)}`);
            console.log(await newData.json());
          }}
          type="checkbox"
          className="checkbox validator ml-4"
          defaultChecked={isDone}
        />
      </label>
    </div>
  );
}
